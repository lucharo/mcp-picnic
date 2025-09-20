# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "dedalus-labs",
#     "python-dotenv",
# ]
# ///
import asyncio
from dedalus_labs import AsyncDedalus, DedalusRunner
from dotenv import load_dotenv
from dedalus_labs.utils.streaming import stream_async

load_dotenv()

async def main():
    client = AsyncDedalus()
    runner = DedalusRunner(client)

    result = await runner.run(
        input="Add these 5 Mediterranean dinner ingredients to my Picnic cart RIGHT NOW: olive oil, feta cheese, cherry tomatoes, pita bread, and chicken breast. Search for each item and add them to cart immediately. Don't ask for confirmation, don't ask follow-up questions, don't suggest modifications - just execute the searches and cart additions.",
        model="openai/gpt-5",
        mcp_servers=["lucharo/mcp-picnic"],
        stream=False
    )

    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())