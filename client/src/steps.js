const steps = [
    {
        name: "persona",
        description: "A persona describes who the result will be tailored for. For example.",
        example: "You are a Product Owner, Scrum Master, UI/UX Designer, Web Developer, or Data Scientist who is at the beginning of your career and is looking to apply what you've learned to build practical experience to help you get noticed in the job market."
    },
    {
        name: "context",
        description: "This provides background information to help the AI tool generate a result that best fits your needs.",
        example: "The information provided should assume that I am a Frontend Web Developer who understands the technical aspects of what is needed to build websites. But, I have not worked in team projects with individuals in different roles."
    },
    {
        name: "task",
        description: "The task defines what information you need.",
        example: "Provide a list of websites for organizations that provide programs and services which will help me transform what I've learned into experience that other job applicants will not have."
    },
    {
        name: "output",
        description: "The output defines how you want the AI tool to respond to your users.",
        example: "The tone should be informal and the list of websites should include a link to the site, it's name, and cost information."
    },
    {
        name: "constraint",
        description: "Finally, constraint provides more direction for any boundaries you would like the AI tool to honor in the results it generates.",
        example: "Avoid generating lots of text only a summary of the websites are needed. Also, responses should be tailored to readers with a high school level of education. Avoid overly technical responses."
    },
]