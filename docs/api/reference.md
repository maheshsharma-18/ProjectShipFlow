# API Reference (TBD)

Use this document to define the external interface. If using REST, place the OpenAPI spec at `docs/api/openapi.yaml` and link to it below. Otherwise, document RPCs/queries with clear request/response examples.

## API Style Checklist
- [ ] Style (REST/gRPC/GraphQL)
- [ ] Authentication (scheme, headers, scopes)
- [ ] Error model (shape, codes)
- [ ] Pagination & filtering conventions
- [ ] Rate limiting & idempotency
- [ ] Versioning strategy

## OpenAPI (if REST)
- Placeholder spec: [openapi.yaml](openapi.yaml)
- Replace with real spec when endpoints are implemented.

## Endpoints / Methods (TBD)
TBD: Provide endpoint tables with method, path, params, status codes, and examples.

Example (REST):
```
Method: POST /v1/items
Auth: Bearer <token>
Request:
{
  "name": "TBD",
  "metadata": {}
}
Response 201:
{
  "id": "item_123",
  "name": "TBD"
}
```

## Webhooks (if applicable) (TBD)
- Event types and payload schemas
- Delivery/retry strategy and backoff
- Signature verification and security considerations
