# MCP Picnic - Dedalus Compatible

This repo provides a [Dedalus MCP deployment framework](https://docs.dedaluslabs.ai/server-guidelines) compatible version of the original MCP Picnic server.

## What This Adds

This fork makes the following changes to ensure compatibility with the Dedalus deployment framework:

- **HTTP transport by default** (required for cloud deployment)
- **Port 8080 as default** (framework standard)
- **Removed STDIO-first logic** - now uses HTTP unless `--stdio` flag is explicitly passed
- **Streamable HTTP transport** with proper session management
- **Health endpoints** for monitoring

## Available Tools

- **picnic_search** - Search for products in Picnic with pagination and filtered results
- **picnic_get_suggestions** - Get product suggestions based on a query
- **picnic_get_image** - Get image data for a product using the image ID and size
- **picnic_get_categories** - Get product categories with flexible filtering for different use cases
- **picnic_get_category_details** - Get detailed information about a specific category including its items
- **picnic_get_cart** - Get the current shopping cart contents with filtered data
- **picnic_add_to_cart** - Add a product to the shopping cart
- **picnic_remove_from_cart** - Remove a product from the shopping cart
- **picnic_clear_cart** - Clear all items from the shopping cart
- **picnic_get_delivery_slots** - Get available delivery time slots
- **picnic_set_delivery_slot** - Select a delivery time slot
- **picnic_get_deliveries** - Get past and current deliveries with pagination
- **picnic_get_delivery** - Get details of a specific delivery
- **picnic_get_delivery_position** - Get real-time position data for a delivery
- **picnic_get_delivery_scenario** - Get driver and route information for a delivery
- **picnic_cancel_delivery** - Cancel a delivery order
- **picnic_rate_delivery** - Rate a completed delivery
- **picnic_send_delivery_invoice_email** - Send or resend the invoice email for a completed delivery
- **picnic_get_order_status** - Get the status of a specific order
- **picnic_get_user_details** - Get details of the current logged-in user
- **picnic_get_user_info** - Get user information including toggled features
- **picnic_get_lists** - Get shopping lists and sublists
- **picnic_get_list** - Get a specific list or sublist with its items
- **picnic_get_mgm_details** - Get MGM (friends discount) details
- **picnic_get_payment_profile** - Get payment information and profile
- **picnic_get_wallet_transactions** - Get wallet transaction history
- **picnic_get_wallet_transaction_details** - Get detailed information about a specific wallet transaction
- **picnic_generate_2fa_code** - Generate a 2FA code for verification
- **picnic_verify_2fa_code** - Verify a 2FA code

## Original Documentation

For complete documentation, features, and usage instructions, see the [original MCP Picnic README](https://github.com/ivo-toby/mcp-picnic/blob/b238483b9a2a7f97f6f5c4a5cf5c6f1e8d8a1234/README.md).

## Quick Start

```bash
# Install
npm install -g mcp-picnic

# Run with HTTP transport (default)
mcp-picnic

# Run with STDIO transport
mcp-picnic --stdio

# Custom port
mcp-picnic --port 3000
```

## Environment Variables

```bash
PICNIC_USERNAME=your-email@example.com
PICNIC_PASSWORD=your-password
PORT=8080  # Optional, defaults to 8080
```

## Dedalus Deployment

This server is ready for deployment on the Dedalus platform. It follows the [recommended architecture patterns](https://docs.dedaluslabs.ai/server-guidelines) with:

- `src/index.ts` as entry point
- HTTP transport as primary method
- Proper session management
- TypeScript with ES modules
- StreamableHTTPServerTransport implementation

## Local HTTP Testing

```bash
# Start server
npm run dev

# Test initialization
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"tools":{}},"clientInfo":{"name":"TestClient","version":"1.0.0"}}}'
```

## License

MIT License - see [LICENSE](LICENSE) file for details.