import { extractFormData, getCurrencySymbol } from './utils';
import { jobTemplate } from './templates';
class JobSearch {
    constructor(
        searchFormSelector,
        resultscontainerSelector,
        loadingElementSelector
    ) {
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultscontainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
    }

    setCountryCode() {
        this.countryCode = 'gb';
        this.setCurrencySymbol();

        fetch('http://ip-api.com/json')
            .then((results) => results.json())
            .then((result) => {
                this.setCountryCode = result.countryCode.toLowerCase();
                this.setCurrencySymbol();
            });
    }

    setCurrencyCode() {
        this.getCurrencySymbol = getCurrencySymbol(this.countryCode);
    }

    configureFormListener() {
        this.searchForm.addEvenListener('submit', (event) => {
            event.preventDefault();
            this.resultsContainer.innerHTML = '';
            const { search, location } = extractFormData(this.searchForm);

            fetch(
                    `http://localhost:3000/?search=${search}&location=${location}&county=${this.countryCode}`
                )
                .then((response) => response.json())
                .then(({ results }) => {
                    return results
                        .map((job) => jobTemplate(job, this.getCurrencySymbol))
                        .join('');
                })
                .then((jobs) => (this.resultsContainer.innerHTML = jobs));
        });
    }
}