import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>
    <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px' }}>Product Management</Header>
    <Content style={{ padding: '20px', minHeight: '80vh' }}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center', backgroundColor:"#122033", color: 'white',}}>© 2024 My M360ict.com</Footer>
  </Layout>
);

export default MainLayout;
