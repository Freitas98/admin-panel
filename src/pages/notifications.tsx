import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Notifications() {
  const context = useAppData()
  
  return (
    <Layout title="Notificações" subtitle="Aqui é onde podemos observar as notificações.">
      <h3>Notificações Conteúdo</h3>
    </Layout>
  )
}

