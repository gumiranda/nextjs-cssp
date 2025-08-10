import {
  type NextRequest,
  NextResponse,
} from 'next/server';
import Stripe from 'stripe';
import {
  createOrUpdateSubscriptionFromStripe,
  cancelSubscription,
} from '@/lib/services/subscription';
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: '2025-07-30.basil',
  },
);

const webhookSecret =
  process.env.STRIPE_WEBHOOK_SECRET!;
export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.text();
    const signature =
      request.headers.get(
        'stripe-signature',
      )!;
    let event: Stripe.Event;
    try {
      event =
        stripe.webhooks.constructEvent(
          body,
          signature,
          webhookSecret,
        );
    } catch (err) {
      console.error(
        'Webhook signature verification failed:',
        err,
      );
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 },
      );
    }
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data
          .object as Stripe.Checkout.Session;
        console.log(
          'Payment succeeded:',
          session.id,
        );
        try {
          const clerkUserId =
            session.client_reference_id;

          if (!clerkUserId) {
            console.error(
              'No clerk user ID found in session',
            );
            break;
          }

          // Get the subscription from Stripe
          if (session.subscription) {
            const subscription =
              await stripe.subscriptions.retrieve(
                session.subscription as string,
              );

            await createOrUpdateSubscriptionFromStripe(
              subscription,
              clerkUserId,
            );
            console.log(
              'Subscription saved to database:',
              subscription.id,
            );
          }
        } catch (error) {
          console.error(
            'Error handling checkout session:',
            error,
          );
        }
        break;
      case 'customer.subscription.created':
        const subscription = event.data
          .object as Stripe.Subscription;
        console.log(
          'Subscription created:',
          subscription.id,
        );

        try {
          // Try to get clerkUserId from customer metadata
          const customer =
            await stripe.customers.retrieve(
              subscription.customer as string,
            );
          const clerkUserId = (
            customer as Stripe.Customer
          ).metadata?.clerkUserId;

          await createOrUpdateSubscriptionFromStripe(
            subscription,
            clerkUserId,
          );
          console.log(
            'New subscription saved to database:',
            subscription.id,
          );
        } catch (error) {
          console.error(
            'Error handling subscription creation:',
            error,
          );
        }
        break;

      case 'customer.subscription.updated':
        const updatedSubscription =
          event.data
            .object as Stripe.Subscription;
        console.log(
          'Subscription updated:',
          updatedSubscription.id,
        );

        try {
          await createOrUpdateSubscriptionFromStripe(
            updatedSubscription,
          );
          console.log(
            'Subscription updated in database:',
            updatedSubscription.id,
          );
        } catch (error) {
          console.error(
            'Error handling subscription update:',
            error,
          );
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription =
          event.data
            .object as Stripe.Subscription;
        console.log(
          'Subscription cancelled:',
          deletedSubscription.id,
        );

        try {
          await cancelSubscription(
            deletedSubscription.id,
          );
          console.log(
            'Subscription cancelled in database:',
            deletedSubscription.id,
          );
        } catch (error) {
          console.error(
            'Error handling subscription cancellation:',
            error,
          );
        }
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data
          .object as Stripe.Invoice;
        console.log(
          'Payment succeeded:',
          invoice.id,
        );

        try {
          // Get subscription ID from the invoice line items
          const subscriptionId =
            invoice.lines?.data?.[0]
              ?.subscription;

          if (
            subscriptionId &&
            typeof subscriptionId ===
              'string'
          ) {
            const subscription =
              await stripe.subscriptions.retrieve(
                subscriptionId,
              );
            await createOrUpdateSubscriptionFromStripe(
              subscription,
            );
            console.log(
              'Subscription updated after successful payment:',
              subscription.id,
            );
          }
        } catch (error) {
          console.error(
            'Error handling successful payment:',
            error,
          );
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data
          .object as Stripe.Invoice;
        console.log(
          'Payment failed:',
          failedInvoice.id,
        );

        try {
          // Get subscription ID from the invoice line items
          const subscriptionId =
            failedInvoice.lines
              ?.data?.[0]?.subscription;

          if (
            subscriptionId &&
            typeof subscriptionId ===
              'string'
          ) {
            const subscription =
              await stripe.subscriptions.retrieve(
                subscriptionId,
              );
            await createOrUpdateSubscriptionFromStripe(
              subscription,
            );
            console.log(
              'Subscription updated after failed payment:',
              subscription.id,
            );
          }
        } catch (error) {
          console.error(
            'Error handling failed payment:',
            error,
          );
        }
        break;
    }
  } catch (error) {}
}
