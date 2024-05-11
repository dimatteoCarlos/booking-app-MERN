import Header from '../../components/header/Header.tsx';
import Presentation from '../../components/presentation/Presentation.tsx';
import DetailedProperties from '../../components/detailedProperties/DetailedProperties.tsx';
import ListProperties from '../../components/listProperties/ListProperties.tsx';
import EmailSignup from '../../components/emailSignup/EmailSignup.tsx';
import FooterList from '../../components/footerList/FooterList.tsx';
import './home.css';

function Home(): JSX.Element {
  return (
    <>
      <Header modeType={null} />

      <div className='home-container '>
        <Presentation />
        <h1 className='home-title'>Browse by property type</h1>
        <ListProperties />
        <h1 className='home-title'>Featured Properties</h1>
        <DetailedProperties />
        <EmailSignup />
        <FooterList />
      </div>
    </>
  );
}

export default Home;
