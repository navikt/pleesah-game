import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/kubernetes/api/api/v1/team/:team/status", () => {
    return HttpResponse.json([]);
  }),
];
