import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Notifications() {
  const context = useAppData()
  
  return (
    <Layout title="Notificações" subtitle="Subtítulo da página de notificações">
      <h3>Página de Notificações</h3>
    </Layout>
  )
}

