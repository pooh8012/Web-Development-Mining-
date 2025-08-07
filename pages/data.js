// pages/data.js
import SectionTitle from "../components/UI/SectionTitle";
import DataRepository from "../components/Data/DataRepository";

export default function Data() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Access comprehensive research materials, datasets, and documentation to support your analysis of mining and data-mining connections">
          Data Repository
        </SectionTitle>

        <DataRepository />
      </div>
    </div>
  );
}
