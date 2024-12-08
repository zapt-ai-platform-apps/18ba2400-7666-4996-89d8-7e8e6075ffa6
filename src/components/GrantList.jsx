import { For, Show } from 'solid-js';

function GrantList(props) {
  const { grants, errorMessage, generateWordDocument, copyToClipboard } = props;

  return (
    <>
      <Show when={errorMessage()}>
        <p class="mt-4 text-red-500">{errorMessage()}</p>
      </Show>

      <Show when={grants().length > 0}>
        <div class="mt-8">
          <h2 class="text-xl font-bold mb-4 text-purple-600">Available Grants</h2>
          <For each={grants()}>
            {(grant) => (
              <div class="bg-white p-6 rounded-lg shadow-md mb-4">
                <h3 class="text-lg font-semibold mb-2">{grant.name}</h3>
                <p class="mb-2">{grant.description}</p>
                <p class="mb-2">
                  <strong>Eligibility Criteria:</strong> {grant.eligibilityCriteria}
                </p>
                <p>
                  <a
                    href={grant.website}
                    target="_blank"
                    class="text-blue-500 hover:underline"
                  >
                    Visit Website
                  </a>
                </p>
              </div>
            )}
          </For>

          <div class="flex space-x-4 mt-6">
            <button
              onClick={generateWordDocument}
              class="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              Save to MS Word
            </button>
            <button
              onClick={copyToClipboard}
              class="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </Show>
    </>
  );
}

export default GrantList;