function GrantForm(props) {
  const { responses, setResponses, handleSubmit, loading } = props;

  const handleInputChange = (field, value) => {
    setResponses({ ...responses(), [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <div>
        <label class="block mb-1 font-semibold">
          1. Please describe exactly what your business does.
        </label>
        <textarea
          value={responses().businessDescription}
          onInput={(e) => handleInputChange('businessDescription', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        ></textarea>
      </div>
      <div>
        <label class="block mb-1 font-semibold">
          2. What types of customers do you serve?
        </label>
        <input
          type="text"
          value={responses().customerType}
          onInput={(e) => handleInputChange('customerType', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-semibold">
          3. Which sector does your business belong to?
        </label>
        <input
          type="text"
          value={responses().businessSector}
          onInput={(e) => handleInputChange('businessSector', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-semibold">
          4. What is your business’s annual turnover (in £GBP)?
        </label>
        <input
          type="number"
          value={responses().annualTurnover}
          onInput={(e) => handleInputChange('annualTurnover', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-semibold">
          5. How many years has your business been operating?
        </label>
        <input
          type="number"
          value={responses().yearsOperating}
          onInput={(e) => handleInputChange('yearsOperating', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-semibold">
          6. Where is your business based?
        </label>
        <input
          type="text"
          value={responses().businessLocation}
          onInput={(e) => handleInputChange('businessLocation', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-semibold">
          7. Where do you supply your products and services?
        </label>
        <input
          type="text"
          value={responses().serviceArea}
          onInput={(e) => handleInputChange('serviceArea', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
          required
        />
      </div>
      <button
        type="submit"
        class={`w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
          loading() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading()}
      >
        {loading() ? 'Searching for Grants...' : 'Find Grants'}
      </button>
    </form>
  );
}

export default GrantForm;