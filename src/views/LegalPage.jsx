import PageHero from '../components/PageHero';
import LegalContent from '../components/legal/LegalContent';

/* Privacy Policy (/privacy-policy) and Terms & Conditions (/terms-conditions) – content in data/legal.jsx */
export default function LegalPage({ data }) {
  return (
    <>
      <PageHero data={data.hero} />
      <LegalContent data={data} />
    </>
  );
}
