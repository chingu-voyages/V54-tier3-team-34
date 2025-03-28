const persona = "Senior technical documentation specialist; Background in software engineering; Experienced in creating clear; concise documentation for complex technical products; Skilled at translating technical concepts for diverse audiences";
const context = "Documenting a new machine learning API for a startup developing predictive analytics software; Target audience includes software developers, data scientists, and technical managers; API is relatively new and lacks comprehensive documentation; Company wants to attract early adopters and facilitate quick integration";
const task = "Create a comprehensive API documentation guide that: Explains core functionalities of the predictive analytics API; Provides clear, step-by-step implementation guidelines; Includes practical code examples; Highlights unique selling points and potential use cases; Ensures accessibility for both experienced and junior developers";
const output = "Deliverable Structure: Overview section{API purpose and core capabilities; High-level architecture; Technical requirements;}; Getting Started Guide{Authentication methods; Installation instructions; Basic configuration steps;}; Detailed Endpoint Documentation{Comprehensive endpoint descriptions; Request/response schemas; Error handling guidelines;}; Code Examples {Python implementation snippets; JavaScript integration examples; Practical use case demonstrations;}; Best Practices and Performance Optimization{ Recommended usage patterns; Scaling considerations; Common pitfalls and solutions;}";
const constraint ="Maximum document length: 25 pages; Must be technically accurate; Language should be professional yet accessible; Include visual aids (diagrams, code blocks); Comply with company's style guide; Avoid overly complex technical jargon; Provide cross-platform compatibility information; Ensure ADA compliance for digital accessibility";


const inputArr = [persona, context, task, output, constraint];

// const prompt = `Give a response for the following prompt built with the Pentagram Framework for prompt engineering: Persona:{${inputArr[0]}}, Context:{${inputArr[1]}}, Task:{${inputArr[2]}}, Output:{${inputArr[3]}}, Constraint:{${inputArr[4]}}.`;

const prompt = 'Give me an answer containing headings, tables, code block, lists, and every possible formatting and elements your answer could have. The content does not matter.';

export default prompt;