export default class ResourceNotFoundException extends Error {
  constructor(resourceName: string, filters: Record<string, string>) {
    const strFilters: string = Object
      .keys(filters)
      .map((filterColumn) => {
        const filterValue: string = filters[filterColumn]

        return `${filterColumn}: '${filterValue}'`
      }).join(', ')

    super(`Resource with name '${resourceName}' and filters :${strFilters} not found`);
    this.name = ResourceNotFoundException.name
    Error.captureStackTrace(this, ResourceNotFoundException)
  }
}
