// pages/team.js
import Head from 'next/head';
import PageHero from '@/components/Layout/PageHero';
import TeamSection from '@/components/Home/TeamSection';

export default function TeamPage() {
  return (
    <>
      <Head>
        <title>Team | D_Mining Lab</title>
        <meta name="description" content="Meet the team behind the D_Mining Lab research project." />
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#0a0214] via-[#120018] to-[#1a0020] text-white">
        <main className="flex-1">
          <div className="pt-24 sm:pt-28 lg:pt-32">
            <TeamSection />
          </div>
        </main>
      </div>
    </>
  );
}
