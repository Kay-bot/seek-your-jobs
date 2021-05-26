import { getCurrencySymbol, extractFormData } from './utils';
import { jobTemplate } from './templates';
import { API, IP_API } from './config'

export class JobSearch {
    constructor(
        searchFormSelector,
        resultsContainerSelector,
        loadingElementSelector
    ) {
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultsContainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
    }

    setCountryCode() {
        this.countryCode = 'gb';
        this.setCurrencySymbol();

        fetch(`${IP_API}`)
            .then((results) => results.json())
            .then((results) => {
                this.countryCode = results.countryCode.toLowerCase();
                this.setCurrencySymbol();
            });
    }

    setCurrencySymbol() {
        this.currencySymbol = getCurrencySymbol(this.countryCode);
    }

    configureFormListener() {
        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.resultsContainer.innerHTML = '';
            const { search, location, salary_min, salary_max } = extractFormData(this.searchForm);
            this.startLoading();
            fetch(`${API}/?search=${search}&location=${location}&salary_min=${salary_min}&salary_max=${salary_max}&country=${this.countryCode}`)
                .then((response) => response.json())
                .then(({ results }) => {
                    this.stopLoading();
                    return results
                        .map((job) => jobTemplate(job, this.currencySymbol))
                        .join('');
                })
                .then((jobs) => (this.resultsContainer.innerHTML = jobs))
                .catch(() => this.stopLoading());
        });
    }

    startLoading() {
        this.loadingElement.classList.add('loading');
    }

    stopLoading() {
        this.loadingElement.classList.remove('loading');
    }
}