import { createSelector } from 'reselect'

const filteredSortedVendors = createSelector(
    state => state.vendors, state => state.search,
    (vendors, search) => {
        let filtered = Object.values(vendors).filter(vendor => vendor.company.toLowercase().indexOf(search.term.toLowercase()) > -1).sort((a,b) => a.company.localeCompare(b.company)) || []
        return filtered
    }
)
 
export default {
    filteredSortedVendors : filteredSortedVendors
};