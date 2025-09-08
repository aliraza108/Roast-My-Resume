# from agents import function_tool, Runner, Agent, set_default_openai_api, set_tracing_disabled, RunHooks, guardrail, RunContextWrapper, RunConfig, AsyncOpenAI, OpenAIChatCompletionsModel, set_default_openai_client, AgentHooks, ModelSettings,SQLiteSession
# from openai.types.responses import ResponseTextDeltaEvent
# from agents.agent import StopAtTools
# import pdfplumber
# import asyncio
# import os
# from dataclasses import dataclass
# api_key = 'AIzaSyCRhMEV0dpTxSVWhy9TDz5843zpcgS2bAA'
# MODEL = 'gemini-2.0-flash'
# client = AsyncOpenAI(
#     base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
#     api_key=api_key
# )

# #Global Config
# set_default_openai_api('chat_completions')
# set_default_openai_client(client=client)
# set_tracing_disabled(True)

# session = SQLiteSession("conversation_123")


# @function_tool
# def extract_pdf_text(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             total_pages = len(pdf.pages)

#             for i, page in enumerate(pdf.pages, start=1):

#                 # Extract text with formatting
#                 text = page.extract_text(x_tolerance=1, y_tolerance=1)
#                 if text:
#                     print(text.strip())
#                 else:
#                     print("[No extractable text on this page]")
#                 print("\n")
#         return text.strip()

#     except Exception as e:
#         print(f"❌ Error: {e}")



# agent = Agent(
#     name="SEO Agent",
#     instructions="you are roaster on resume mistakes and lakes and suggestor changes needed, use tool extract_pdf_text to get text from resume, ask user resume path if not specified",
#     model=MODEL,
#     tools=[extract_pdf_text])

# while True:
#     result = Runner.run_sync(
#         agent, input=input("your input: "),session=session
#     )
#     print(result.final_output)
