# Meetings Notes

> A log for the notes summarizing our meetings

## Sprint 3 - Collaboration Meeting

> 18th March 2025 / 11:00 PM GMT

**Attendees**:

- Anas
- Kosiso
- Rafael

**Agenda**:

- [Defining our workflow](https://trello.com/c/ExDGf9Ya/26-defining-our-workflow):
  - Coding standards (Done)
  - git workflow (Done)
  - Branch/commit conventions (Done)
  - Deployment platform (Done)
  - Recurring meeting times (TBD)
- [Drafting our definition of done](https://trello.com/c/Keu8HEq3/31-creating-our-definition-of-done) (Incomplete)

**Notes**:

1. On coding standards - This is v1, and may be updated:

   - Linting + formatting handled by tools (eslint/prettier)
      - git hooks to automate it locally on pre-commit
      - CI **is not required as of now** to automate it on the remote repo
   - Testing encouraged but not required: While we recognize its necessity, We'll offload that responsibility to those who want to learn it and those who are already comfortable with it.
   - Variable names clear, descriptive, and made of words
   - errors and special cases handled
   - Validation handled
   - docs (including readme) updated to reflect new changes
   - Accessibility basics required for HTML:
      - design is responsive
      - html is semantic
      - navigation works with keyboard only
      - alt text is present when applicable
      - forms are accessible
      - headings are properly used
2. On git workflow: We'll follow [Chingu's workflow](https://github.com/chingu-voyages/Handbook/blob/main/docs/resources/techresources/gitgithub.md#the-workflow)
3. On naming conventions:

   - commits to follow the mandatory parts of the [**conventional commits** spec](https://www.conventionalcommits.org/en/v1.0.0/): Link to a [cheatsheet](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) for easy reference.
   - branch names to use the types of conventional commits following the format `<type>/<name>` (e.g feat/dark-mode)

4. On deployment platform:

   - [Render](https://render.com/) for both dev and prod environments

**Action Items**:

- Update our decisions log with the relevant parts
- Include our coding standards in the definition of done
- Choose testing tools
- Choose recurring times for sprint planning, review, and retrospective

**Resources**:
[accessibility guidelines for developers](https://daily.dev/blog/10-web-accessibility-guidelines-for-developers)

## Sprint 1 - Kickoff Meeting

> 6th March 2025 / 2:00 PM GMT

Next meeting: Monday 3-4pm UTC

**Attendees**:

- Greg
- Rafael
- Samad
- Anas
- Anita

**Notes**:

- Decide on a team goal – one that covers each other’s goal for the voyage
- Expectations of the team – overcommunicate and be dedicated to the product goal/vision
- What does success look like as a team – going through the process of the voyage even if we don’t finish the project
- How to make decisions – have the project vision statement in mind to decide rightly
- How to deal with conflicts – have a discussion with each other – the scrum master will step in to solve any impediments
- Time commitments – each member is willing to commit to this voyage
- Tech stack – frontend – react; backend – nodejs; Devops - docker

project discussion – The team decided not to do the AI app because it was only frontend but the developers agreed to do both frontend and backend this voyage. Given that, the team agreed to come up with project ideas we could implement. Here are the documents for The decision log and The project ideas. Let us edit it asynchronously directly on the main branch for now

**Action Items**:

- Place ideas in the project ideas document
- Read the handbook and agile – scrum values and pillars - <https://github.com/chingu-voyages/Handbook/blob/main/docs/guides/voyage/topics/voyage_soft_skills.md>

**Resources**:

- Here's the [new schej link](https://schej.it/e/cdFD7) to indicate our general availability throughout the weeks
- Chingu project showcase - <https://dev.to/chingu> -- for inspiration
- The handbook for chingu that we referenced in the meeting has a treasure trove of generally helpful information that we can use individually, and more specifically voyage related guides and resources that will help us navigate the sprints to come.

## Sprint # - Example Meeting

> Day Month Year / 00:00 AM/PM GMT

Next meeting to be held exceptionally on T, decision log updated to temporarily reflect that.

**Attendees**:

- Teammate1
- Teammate2
- Teammate3

**Notes**:

- We talked about issue X
- We discussed options for Y
- We brainstormed ideas for Z
