export interface RiskDetailsMap {
    srNo: number,
    apiVersion: string,
    apiName: string,
    apiType: string,
    apiRiskClassificatin: string,
    ramlReviewStatus: string,
    ramlReviewDate: string,
    veracodeStatus: string,
    veracodeDate: string,
    penTestStatus: string,
    penTestDate: string,
    veracodeSlaBreach: string,
    penTestSlaBreach: string,
    ramlReviewPending: string,
    riskScore: number
}
