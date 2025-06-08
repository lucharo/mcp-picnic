# MCP Picnic - AI-Powered Grocery Shopping Assistant

An intelligent Model Context Protocol (MCP) server that enables AI assistants to interact with Picnic, the online supermarket delivery service. This server transforms your AI assistant into a smart grocery shopping companion that can help you plan meals, manage your shopping cart, track deliveries, and optimize your grocery shopping experience.

## What is MCP Picnic?

MCP Picnic is a bridge between AI assistants (like Claude, ChatGPT, or other MCP-compatible tools) and Picnic's grocery delivery service. It provides:

- **🛒 Smart Shopping**: Search products, manage your cart, and place orders through natural conversation
- **🍽️ Meal Planning**: Get AI-powered meal plans with automatic shopping list generation
- **💰 Budget Management**: Shop within your budget with cost-conscious recommendations
- **🚚 Delivery Tracking**: Monitor your orders and optimize delivery schedules
- **🥗 Dietary Support**: Find products that match your dietary restrictions and health goals
- **📱 Complete Integration**: Access all Picnic features through your AI assistant

### Supported Countries

- 🇳🇱 Netherlands
- 🇩🇪 Germany

## Key Features

### 🤖 AI-Powered Shopping Tools

- **Product Search**: Find any product in Picnic's catalog
- **Cart Management**: Add, remove, and modify items in your shopping cart
- **Order Tracking**: Monitor delivery status and driver location
- **Account Management**: Access your profile, payment methods, and order history

### 🎯 Intelligent Prompts

- **Meal Planner**: Create weekly meal plans with automatic shopping lists
- **Budget Shopping**: Stay within budget while maintaining quality
- **Quick Dinners**: Find fast meal solutions for busy schedules
- **Healthy Eating**: Get nutrition-focused product recommendations
- **Special Occasions**: Plan for parties, holidays, and gatherings
- **Pantry Restocking**: Maintain essential household supplies
- **Recipe Recreation**: Find ingredients for specific recipes
- **Dietary Substitutions**: Get alternatives for dietary restrictions

## How to Use

### Prerequisites

- A Picnic account (available in Netherlands or Germany)
- An MCP-compatible AI assistant (Claude Desktop, Continue, etc.)
- Node.js 18+ installed on your system

### Quick Start

1. **Install the server**:

```bash
npm install -g mcp-picnic
```

2. **Configure Claude Desktop** to use the MCP server:

**macOS**: Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: Edit `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "picnic": {
      "command": "npx",
      "args": ["-y", "mcp-picnic"],
      "env": {
        "PICNIC_USERNAME": "your-picnic-email@example.com",
        "PICNIC_PASSWORD": "your-picnic-password"
      }
    }
  }
}
```

**Important**: Replace `your-picnic-email@example.com` and `your-picnic-password` with your actual Picnic account credentials.

3. **Restart Claude Desktop** completely

4. **Start using it** - you should see a 🔨 hammer icon in the input area:

```
"I want to plan meals for this week and order groceries from Picnic"
```

### Example Conversations

**Meal Planning**:

```
User: "Plan healthy meals for 2 people for 5 days, budget €75"
AI: I'll help you create a healthy meal plan! First, let me log into your Picnic account...
```

**Quick Shopping**:

```
User: "I need ingredients for pasta carbonara tonight"
AI: Let me search for carbonara ingredients on Picnic and add them to your cart...
```

**Delivery Tracking**:

```
User: "When is my grocery delivery arriving?"
AI: Let me check your current deliveries and their status...
```

## Setup Instructions

### Option 1: Install from NPM (Recommended)

```bash
# Install globally
npm install -g mcp-picnic

# Or install locally in your project
npm install mcp-picnic
```

### Option 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/ivo-toby/mcp-picnic.git
cd mcp-picnic

# Install dependencies
npm install

# Build the project
npm run build

# Link globally (optional)
npm link
```

### Configuration

The server supports both stdio and HTTP transports:

**Stdio Transport (Default)**:

```bash
mcp-picnic
```

**HTTP Transport**:

```bash
mcp-picnic --enable-http --http-port 3000
```

### Environment Variables

You can configure the server using environment variables:

```bash
# Required: Picnic Account Credentials
PICNIC_USERNAME=your-picnic-email@example.com
PICNIC_PASSWORD=your-picnic-password

# HTTP Transport settings (optional)
ENABLE_HTTP_SERVER=true
HTTP_PORT=3000
HTTP_HOST=localhost

# Picnic API settings (optional)
PICNIC_COUNTRY_CODE=NL  # or DE
PICNIC_API_VERSION=15
```

### MCP Client Configuration

#### Claude Desktop

**Configuration File Locations:**

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Configuration:**

```json
{
  "mcpServers": {
    "picnic": {
      "command": "npx",
      "args": ["-y", "mcp-picnic"],
      "env": {
        "PICNIC_USERNAME": "your-picnic-email@example.com",
        "PICNIC_PASSWORD": "your-picnic-password"
      }
    }
  }
}
```

**Important**: Replace the placeholder credentials with your actual Picnic account details.

**Setup Steps:**

1. Open Claude Desktop
2. Go to Claude menu → Settings (not the in-app settings)
3. Click "Developer" in the left sidebar
4. Click "Edit Config" to open the configuration file
5. Add the configuration above
6. Save the file and restart Claude Desktop
7. Look for the 🔨 hammer icon in the input area

#### Continue (VS Code)

Add to your Continue configuration:

```json
{
  "mcpServers": [
    {
      "name": "picnic",
      "command": "npx",
      "args": ["-y", "mcp-picnic"],
      "env": {
        "PICNIC_USERNAME": "your-picnic-email@example.com",
        "PICNIC_PASSWORD": "your-picnic-password"
      }
    }
  ]
}
```

## Authentication

The server uses the credentials configured in your environment variables:

1. **Required**: Set `PICNIC_USERNAME` and `PICNIC_PASSWORD` in your MCP configuration
2. **2FA Support**: If 2FA is enabled on your account, the server will handle verification automatically
3. **Session Management**: Your session will be maintained for subsequent requests

**Security Note**: Your credentials are only used to authenticate with Picnic's API and are not stored permanently. They are passed securely through environment variables.

## Available Tools

The server provides comprehensive access to Picnic's functionality through 25+ specialized tools:

### Authentication & Account Management

- **`picnic_login`** - Login to Picnic with username/password and country code
- **`picnic_generate_2fa_code`** - Generate 2FA verification code (SMS/other channels)
- **`picnic_verify_2fa_code`** - Verify 2FA code for authentication
- **`picnic_get_user_details`** - Get current user profile information
- **`picnic_get_user_info`** - Get user information including feature toggles

### Product Discovery & Search

- **`picnic_search`** - Search for products by name or keywords
- **`picnic_get_suggestions`** - Get product suggestions based on query
- **`picnic_get_article`** - Get detailed information about a specific product
- **`picnic_get_image`** - Get product images in various sizes (tiny to extra-large)
- **`picnic_get_categories`** - Browse product categories with configurable depth

### Shopping Cart Management

- **`picnic_get_cart`** - View current shopping cart contents and totals
- **`picnic_add_to_cart`** - Add products to cart with specified quantities
- **`picnic_remove_from_cart`** - Remove products from cart with specified quantities
- **`picnic_clear_cart`** - Clear all items from the shopping cart

### Delivery & Order Management

- **`picnic_get_delivery_slots`** - View available delivery time slots
- **`picnic_set_delivery_slot`** - Select and book a delivery time slot
- **`picnic_get_deliveries`** - Get list of past and current deliveries with filters
- **`picnic_get_delivery`** - Get detailed information about a specific delivery
- **`picnic_get_delivery_position`** - Track real-time driver location and ETA
- **`picnic_get_delivery_scenario`** - Get driver and route information
- **`picnic_cancel_delivery`** - Cancel a scheduled delivery
- **`picnic_rate_delivery`** - Rate completed deliveries (0-10 scale)
- **`picnic_send_delivery_invoice_email`** - Send/resend delivery invoice emails
- **`picnic_get_order_status`** - Check status of specific orders

### Lists & Organization

- **`picnic_get_lists`** - Get shopping lists and sublists with configurable depth
- **`picnic_get_list`** - Get specific list or sublist with all items

### Payment & Financial

- **`picnic_get_payment_profile`** - View payment methods and billing information
- **`picnic_get_wallet_transactions`** - Get wallet transaction history (paginated)
- **`picnic_get_wallet_transaction_details`** - Get detailed transaction information
- **`picnic_get_mgm_details`** - Get MGM (friends discount) program details

## Development

### Running in Development Mode

```bash
# Clone and setup
git clone https://github.com/ivo-toby/mcp-picnic.git
cd mcp-picnic
npm install

# Development with hot reload
npm run dev

# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Project Structure

```
src/
├── index.ts              # Main server entry point
├── config.ts             # Configuration management
├── tools/                # Picnic API tool implementations
├── prompts/              # AI prompt templates
├── resources/            # Resource definitions
├── handlers/             # Request handlers
├── transports/           # Transport layer (stdio/HTTP)
└── utils/                # Utility functions
```

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/ivo-toby/mcp-picnic/wiki)
- 🐛 [Report Issues](https://github.com/ivo-toby/mcp-picnic/issues)
- 💬 [Discussions](https://github.com/ivo-toby/mcp-picnic/discussions)

---

# MCP Picnic - AI-Gestuurde Boodschappen Assistent (Nederlands)

Een intelligente Model Context Protocol (MCP) server die AI-assistenten in staat stelt om te communiceren met Picnic, de online supermarkt bezorgservice. Deze server transformeert je AI-assistent in een slimme boodschappen-companion die je kan helpen met maaltijdplanning, het beheren van je winkelwagen, het volgen van leveringen, en het optimaliseren van je boodschappen-ervaring.

## Wat is MCP Picnic?

MCP Picnic is een brug tussen AI-assistenten (zoals Claude, ChatGPT, of andere MCP-compatibele tools) en Picnic's bezorgservice voor boodschappen. Het biedt:

- **🛒 Slim Winkelen**: Zoek producten, beheer je winkelwagen, en plaats bestellingen via natuurlijke conversatie
- **🍽️ Maaltijdplanning**: Krijg AI-gestuurde maaltijdplannen met automatische boodschappenlijst generatie
- **💰 Budget Beheer**: Shop binnen je budget met kostenefficiënte aanbevelingen
- **🚚 Bezorging Volgen**: Monitor je bestellingen en optimaliseer bezorgschema's
- **🥗 Dieet Ondersteuning**: Vind producten die passen bij je dieetbeperkingen en gezondheidsdoelen
- **📱 Volledige Integratie**: Toegang tot alle Picnic functies via je AI-assistent

### Ondersteunde Landen

- 🇳🇱 Nederland
- 🇩🇪 Duitsland

## Belangrijkste Functies

### 🤖 AI-Gestuurde Winkel Tools

- **Product Zoeken**: Vind elk product in Picnic's catalogus
- **Winkelwagen Beheer**: Voeg toe, verwijder, en wijzig items in je winkelwagen
- **Bestelling Volgen**: Monitor bezorgstatus en chauffeur locatie
- **Account Beheer**: Toegang tot je profiel, betaalmethoden, en bestelgeschiedenis

### 🎯 Intelligente Prompts

- **Maaltijdplanner**: Creëer wekelijkse maaltijdplannen met automatische boodschappenlijsten
- **Budget Winkelen**: Blijf binnen budget terwijl je kwaliteit behoudt
- **Snelle Diners**: Vind snelle maaltijdoplossingen voor drukke schema's
- **Gezond Eten**: Krijg voeding-gerichte productaanbevelingen
- **Speciale Gelegenheden**: Plan voor feesten, vakanties, en bijeenkomsten
- **Voorraadkast Aanvullen**: Onderhoud essentiële huishoudelijke benodigdheden
- **Recept Recreatie**: Vind ingrediënten voor specifieke recepten
- **Dieet Vervangingen**: Krijg alternatieven voor dieetbeperkingen

## Hoe te Gebruiken

### Vereisten

- Een Picnic account (beschikbaar in Nederland of Duitsland)
- Een MCP-compatibele AI-assistent (Claude Desktop, Continue, etc.)
- Node.js 18+ geïnstalleerd op je systeem

### Snelle Start

1. **Installeer de server**:

```bash
npm install -g mcp-picnic
```

2. **Configureer Claude Desktop** om de MCP server te gebruiken:

**macOS**: Bewerk `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: Bewerk `%APPDATA%\Claude\claude_desktop_config.json`

Voeg deze configuratie toe:

```json
{
  "mcpServers": {
    "picnic": {
      "command": "npx",
      "args": ["-y", "mcp-picnic"],
      "env": {
        "PICNIC_USERNAME": "jouw-picnic-email@example.com",
        "PICNIC_PASSWORD": "jouw-picnic-wachtwoord"
      }
    }
  }
}
```

**Belangrijk**: Vervang `jouw-picnic-email@example.com` en `jouw-picnic-wachtwoord` met je echte Picnic account gegevens.

3. **Herstart Claude Desktop** volledig

4. **Begin met gebruiken** - je zou een 🔨 hamer icoon moeten zien in het invoerveld:

```
"Ik wil maaltijden plannen voor deze week en boodschappen bestellen bij Picnic"
```

## Setup Instructies

### Optie 1: Installeer van NPM (Aanbevolen)

```bash
# Installeer globaal
npm install -g mcp-picnic

# Of installeer lokaal in je project
npm install mcp-picnic
```

### Optie 2: Bouw van Bron

```bash
# Kloon de repository
git clone https://github.com/ivo-toby/mcp-picnic.git
cd mcp-picnic

# Installeer dependencies
npm install

# Bouw het project
npm run build

# Link globaal (optioneel)
npm link
```

## Authenticatie

De server gebruikt de inloggegevens die geconfigureerd zijn in je omgevingsvariabelen:

1. **Vereist**: Stel `PICNIC_USERNAME` en `PICNIC_PASSWORD` in je MCP configuratie in
2. **2FA Ondersteuning**: Als 2FA is ingeschakeld op je account, handelt de server verificatie automatisch af
3. **Sessiebeheer**: Je sessie wordt onderhouden voor volgende verzoeken

**Beveiligingsnotitie**: Je inloggegevens worden alleen gebruikt om te authenticeren met Picnic's API en worden niet permanent opgeslagen. Ze worden veilig doorgegeven via omgevingsvariabelen.

---

# MCP Picnic - KI-Gesteuerte Lebensmittel-Einkaufsassistent (Deutsch)

Ein intelligenter Model Context Protocol (MCP) Server, der KI-Assistenten ermöglicht, mit Picnic, dem Online-Supermarkt-Lieferservice, zu interagieren. Dieser Server verwandelt Ihren KI-Assistenten in einen intelligenten Einkaufsbegleiter, der Ihnen bei der Mahlzeitenplanung, der Verwaltung Ihres Einkaufswagens, der Verfolgung von Lieferungen und der Optimierung Ihres Einkaufserlebnisses helfen kann.

## Was ist MCP Picnic?

MCP Picnic ist eine Brücke zwischen KI-Assistenten (wie Claude, ChatGPT oder anderen MCP-kompatiblen Tools) und Picnics Lebensmittel-Lieferservice. Es bietet:

- **🛒 Intelligentes Einkaufen**: Suchen Sie Produkte, verwalten Sie Ihren Warenkorb und geben Sie Bestellungen über natürliche Unterhaltung auf
- **🍽️ Mahlzeitenplanung**: Erhalten Sie KI-gesteuerte Mahlzeitenpläne mit automatischer Einkaufslistenerstellung
- **💰 Budget-Management**: Kaufen Sie innerhalb Ihres Budgets mit kostenbewussten Empfehlungen ein
- **🚚 Lieferverfolgung**: Überwachen Sie Ihre Bestellungen und optimieren Sie Lieferpläne
- **🥗 Diät-Unterstützung**: Finden Sie Produkte, die zu Ihren Ernährungseinschränkungen und Gesundheitszielen passen
- **📱 Vollständige Integration**: Zugriff auf alle Picnic-Funktionen über Ihren KI-Assistenten

### Unterstützte Länder

- 🇳🇱 Niederlande
- 🇩🇪 Deutschland

## Hauptfunktionen

### 🤖 KI-Gesteuerte Einkaufs-Tools

- **Produktsuche**: Finden Sie jedes Produkt in Picnics Katalog
- **Warenkorbverwaltung**: Hinzufügen, entfernen und ändern Sie Artikel in Ihrem Warenkorb
- **Bestellverfolgung**: Überwachen Sie Lieferstatus und Fahrerstandort
- **Kontoverwaltung**: Zugriff auf Ihr Profil, Zahlungsmethoden und Bestellhistorie

### 🎯 Intelligente Prompts

- **Mahlzeitenplaner**: Erstellen Sie wöchentliche Mahlzeitenpläne mit automatischen Einkaufslisten
- **Budget-Einkauf**: Bleiben Sie im Budget und behalten dabei die Qualität bei
- **Schnelle Abendessen**: Finden Sie schnelle Mahlzeitenlösungen für geschäftige Zeitpläne
- **Gesunde Ernährung**: Erhalten Sie ernährungsorientierte Produktempfehlungen
- **Besondere Anlässe**: Planen Sie für Partys, Feiertage und Versammlungen
- **Vorratskammer-Auffüllung**: Pflegen Sie wesentliche Haushaltsvorräte
- **Rezept-Nachstellung**: Finden Sie Zutaten für spezifische Rezepte
- **Diät-Ersatz**: Erhalten Sie Alternativen für Ernährungseinschränkungen

## Wie zu Verwenden

### Voraussetzungen

- Ein Picnic-Konto (verfügbar in den Niederlanden oder Deutschland)
- Ein MCP-kompatibler KI-Assistent (Claude Desktop, Continue, etc.)
- Node.js 18+ auf Ihrem System installiert

### Schnellstart

1. **Installieren Sie den Server**:

```bash
npm install -g mcp-picnic
```

2. **Konfigurieren Sie Claude Desktop**, um den MCP-Server zu verwenden:

**macOS**: Bearbeiten Sie `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: Bearbeiten Sie `%APPDATA%\Claude\claude_desktop_config.json`

Fügen Sie diese Konfiguration hinzu:

```json
{
  "mcpServers": {
    "picnic": {
      "command": "npx",
      "args": ["-y", "mcp-picnic"],
      "env": {
        "PICNIC_USERNAME": "ihre-picnic-email@example.com",
        "PICNIC_PASSWORD": "ihr-picnic-passwort"
      }
    }
  }
}
```

**Wichtig**: Ersetzen Sie `ihre-picnic-email@example.com` und `ihr-picnic-passwort` mit Ihren tatsächlichen Picnic-Kontodaten.

3. **Starten Sie Claude Desktop** vollständig neu

4. **Beginnen Sie mit der Nutzung** - Sie sollten ein 🔨 Hammer-Symbol im Eingabebereich sehen:

```
"Ich möchte Mahlzeiten für diese Woche planen und Lebensmittel bei Picnic bestellen"
```

## Setup-Anweisungen

### Option 1: Von NPM installieren (Empfohlen)

```bash
# Global installieren
npm install -g mcp-picnic

# Oder lokal in Ihrem Projekt installieren
npm install mcp-picnic
```

### Option 2: Aus Quelle erstellen

```bash
# Repository klonen
git clone https://github.com/ivo-toby/mcp-picnic.git
cd mcp-picnic

# Abhängigkeiten installieren
npm install

# Projekt erstellen
npm run build

# Global verknüpfen (optional)
npm link
```

## Authentifizierung

Der Server verwendet die in Ihren Umgebungsvariablen konfigurierten Anmeldedaten:

1. **Erforderlich**: Setzen Sie `PICNIC_USERNAME` und `PICNIC_PASSWORD` in Ihrer MCP-Konfiguration
2. **2FA-Unterstützung**: Wenn 2FA auf Ihrem Konto aktiviert ist, handhabt der Server die Verifizierung automatisch
3. **Sitzungsverwaltung**: Ihre Sitzung wird für nachfolgende Anfragen beibehalten

**Sicherheitshinweis**: Ihre Anmeldedaten werden nur zur Authentifizierung mit Picnics API verwendet und nicht dauerhaft gespeichert. Sie werden sicher über Umgebungsvariablen übertragen.
