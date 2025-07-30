  
import { Button } from "@/components/ui/button";
export default async function HomePage() {
  // ✅ Pode fazer fetch diretamente
  const post = await fetch('https://api.adviceslip.com/advice')
    .then(res => res.json());
   
  return (
    <div>
      <h1>Meu Blog</h1> 
     <Button  variant="default"  >
        Clique Aqui
      </Button>
       {JSON.stringify(post)}
      
    </div>
  );
}