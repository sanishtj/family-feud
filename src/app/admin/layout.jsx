export default function Layout({ children, questions, game }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Admin</h1>
      {children}
      {questions}
      {game}
   </div>
   
  )
}