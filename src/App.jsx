import { createSignal } from 'solid-js';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
import { createEvent } from './supabaseClient';
import GrantForm from './components/GrantForm';
import GrantList from './components/GrantList';

function App() {
  // Signals for user responses
  const [responses, setResponses] = createSignal({
    businessDescription: '',
    customerType: '',
    businessSector: '',
    annualTurnover: '',
    yearsOperating: '',
    businessLocation: '',
    serviceArea: ''
  });

  const [grants, setGrants] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const prompt = `Based on the following business information, provide a comprehensive list of UK-wide and local grants suitable for their business, including detailed descriptions, eligibility criteria, links to relevant websites and other relevant resources:

Business Description: ${responses().businessDescription}
Customer Type: ${responses().customerType}
Business Sector: ${responses().businessSector}
Annual Turnover: £${responses().annualTurnover}
Years Operating: ${responses().yearsOperating}
Business Location: ${responses().businessLocation}
Service Area: ${responses().serviceArea}

Provide the output in JSON format with the following structure:

{
  "grants": [
    {
      "name": "Grant Name",
      "description": "Detailed description of the grant",
      "eligibilityCriteria": "Eligibility criteria details",
      "website": "Link to relevant website"
    },
    ...
  ]
}`;

    try {
      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json'
      });
      if (result && result.grants) {
        setGrants(result.grants);
      } else {
        setErrorMessage('No grants found.');
      }
    } catch (error) {
      console.error('Error fetching grants:', error);
      setErrorMessage('An error occurred while fetching grants.');
    } finally {
      setLoading(false);
    }
  };

  const generateWordDocument = async () => {
    const doc = new Document();

    doc.addSection({
      children: [
        new Paragraph({
          text: 'Business Grant Finder Results',
          heading: 'Title',
        }),
        ...grants().map(grant => [
          new Paragraph({
            text: grant.name,
            heading: 'Heading1',
          }),
          new Paragraph(grant.description),
          new Paragraph(`Eligibility Criteria: ${grant.eligibilityCriteria}`),
          new Paragraph(`Website: ${grant.website}`),
        ]).flat(),
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'BusinessGrantFinderResults.docx');
  };

  const copyToClipboard = () => {
    const text = grants()
      .map(
        (grant) =>
          `Name: ${grant.name}\nDescription: ${grant.description}\nEligibility: ${grant.eligibilityCriteria}\nWebsite: ${grant.website}\n`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div class="h-full text-gray-800 p-4 max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-4 text-purple-600">Business Grant Finder</h1>
        <p class="mb-6 text-lg">
          Welcome to the Business Grant Finder! We will help you find potential sources of funding that may help support your business.
        </p>

        <GrantForm
          responses={responses}
          setResponses={setResponses}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <GrantList
          grants={grants}
          errorMessage={errorMessage}
          generateWordDocument={generateWordDocument}
          copyToClipboard={copyToClipboard}
        />

        <footer class="mt-8">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline"
          >
            Made on ZAPT
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;