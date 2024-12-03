export default function constructQueryConditions( params : any ) {
    let queryConditions: Record<string, any> = {};

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryConditions[key] = value;
        }
      });
    }

    return queryConditions;
}