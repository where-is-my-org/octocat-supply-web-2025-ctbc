# OctoCAT Supply Chain Management Application

## GitHub Repo Information

This repo is hosted in GitHub:
- repo: https://github.com/where-is-my-org/octocat-supply-web-2025

# Azure DevOps Information
- Project: https://dev.azure.com/huier23/octosupply-web
- Project Name: octosupply-web
- Team Name: octosupply-web

## Iteration Schedule
- Default Iteration Path: `octosupply-web`
- Iteration 1: 2025-07-20 to 2025-08-04
- Iteration 2: 2025-08-05 to 2025-08-19
- Iteration 3: 2025-08-20 to 2025-09-03
- Iteration 4: 2025-09-04 to 2025-09-18
- Iteration 5: 2025-09-19 to 2025-10-03
- Iteration 6
- Iteration 7
- Iteration 8
- Iteration 9
- Iteration 10
> Note: All new work items should be created as default iteration path.

## Work Item Information and Hierarchy
### Work item Types
- **Feature**: A high-level deliverable representing a major product capability or functional module. Features group related User Stories together.

    |       Azure DevOps Field       |  Document Field  |                   Description                                              |
    |--------------------------------|------------------|----------------------------------------------------------------------------|
    |           System.Title         |  Title           | A concise name for the Feature that reflects its purpos                    |
    |       System.Description       |  Description     | A brief overview of the Feature's purpose and scope                        |
    | Microsoft.VSTS.Common.Priority |  Priority        | Indicates the importance of the Feature in the overall product roadmap     |



- **User Story**: A specific user need or workflow captured under a Feature, often written in the format:

    |       Azure DevOps Field       |    Document Field   |                                      Description                                                           |
    |--------------------------------|---------------------|------------------------------------------------------------------------------------------------------------|
    |          System.Title          |  Title              | A concise name for the User Story that reflects its purpos                                                    |
    |      System.Description        |  Description        | As a [user role], I want [goal], so that [benefit]                                                         |
    |  Microsoft.VSTS.Common.AcceptanceCriteria     | Acceptance Criteria | A set of conditions that must be met to be considered complete. Define the expected behavior and outcomes. |
    | Microsoft.VSTS.Common.Priority |      Priority       | Indicates the importance of the User Story, guiding development focus.                                     |

    - Priority

        | Priority | Level  | Description                                                                                  | Notes                                              |
        |----------|--------|----------------------------------------------------------------------------------------------|----------------------------------------------------|
        | High     | 1      | Critical for the product's success, must be implemented in the current iteration.           | Membership-related User Stories are always High.   |
        | Medium   | 2      | Important but not critical, can be scheduled for future iterations.                         |                                                    |
        | Low      | 3      | Nice to have, can be deferred to later iterations.                                          |                                                    |

- **Task**: The specific technical work needed to implement a User Story. Tasks are actionable, measurable, and typically handled by developers or testers

    |       Azure DevOps Field       |    Document Field   |                                      Description                                                           |
    |--------------------------------|---------------------|------------------------------------------------------------------------------------------------------------|
    |          System.Title          |  work item              | A concise name for the Task that reflects its purpos                                                    |
    |      System.Description        |  Description        | A detailed explanation of the Task, including technical requirements and implementation details.                                                         |
    |  System.IterationPath     | Iteration / Sprint |  |
    |  Assigned To     | Owner | The team member responsible for completing the Task. |
    | Original Estimate |      Hour       | An estimate of the time or resources required to complete the Task.                                     |
    | Activity |      Activity       | Type of work involved (Deployment / Design / Development / Documentation / Requirements / Testing)                                     |


- **Test Case**: A specific test scenario that validates the functionality of a User Story. Test Cases ensure that the implemented features meet the acceptance criteria and function as expected.

    |       Azure DevOps Field       |    Document Field    |                                      
    |--------------------------------|-----------------------------|
    |          System.Title          |      Title                  |
    |      System.Description        |      Description            |
    |       System.IterationPath     |     Iteration               |  
    |           Assigned To          |       Owner                 | 
    |           Action               |  Action Description         |
    |     Excepted result            |  Action Excepted Result     |

    - The Test Steps are created from the list under "Test Steps" section in the document. Every odd row is `Action`, and the next even row is `Expected Result`.
    - Sample output format for MCP tools(JSON)
        ```json
        {
        "System.Title": "Add Product Quantity",
        "System.Description": "Verify that increasing product quantity updates the total price automatically.",
        "System.IterationPath": "Project",
        "Assigned To": "User A",
        "Steps": [
                {
                "Action": "登入企業買家帳戶",
                "Expected Result": "成功登入系統"
                },
                {
                "Action": "進入購物車頁面",
                "Expected Result": "顯示購物車中的所有產品"
                },
                {
                "Action": "為其中一個產品增加數量",
                "Expected Result": "產品數量成功增加，總價自動更新"
                }
            ]
        }
        ```

### Work item Hierarchy
- A Feature (Parent) contains multiple User Stories (Child).
- A User Story (Parent) can have multiple Tasks (Child) or Test Case (Child) associated with it.
- A User Story an have multiple Test Cases to validate its functionality. User Story would linked to Test Cases by `Tested By` link type.
- A User Story (Parent) can have multiple Tasks (Child), and a Task can only belong to one User Story.
```
Feature
│
├── User Story
│   ├── Task
│   ├── Task
│   ├── Task Case
│   └── Task Case
```
