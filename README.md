# HackMath


## Pages

### Public

```mermaid
graph TD;
    Public --> Marketing;
    Marketing --> Home("/");
    Public --> Main;
    Main --> About("/about");
    Main --> Blog("/blog");
    Public --> Auth;
    Auth --> SignIn("/sign-in");
    Auth --> SignUp("/sign-up");
```
### Private

```mermaid
graph TD;
    Private --> Chat("/chat");
    Private --> Courses("/courses");
    Private --> KC("/kc");
    Private --> Leaderboard("/leaderboard");
    Private --> Learn("/learn");
    Private --> Quests("/quests");
    Private --> Shop("/shop");
    Private --> User("/user");
    Private --> Onboarding("/onboarding");

```
### Admin

```mermaid
graph TD;
    Admin --> AdminChallenge("/challenge");
    Admin --> AdminChallengeOptions("/challengeoptions");
    Admin --> AdminCourses("/courses");
    Admin --> AdminLesson("/lesson");
    Admin --> AdminUnit("/unit");
```
