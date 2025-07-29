import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

 
export default async function HomePage() {
  // ✅ Pode fazer fetch diretamente
  const post = await fetch('https://api.adviceslip.com/advice')
    .then(res => res.json());
   
  return (
    <div>
      <h1>Meu Blog</h1> 
     
       {JSON.stringify(post)}
      
    </div>
  );
}