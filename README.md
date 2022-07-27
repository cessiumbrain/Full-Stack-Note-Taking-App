# Read Me
This is a full stack app utilizing google's firebase Authentication API and firestore cloud database API.  

## To-do
- form validation and login error display
    - login
    - add notebook
- create temporary user auth
    - create id in db with temporary: true
    - on signout if temporary: true, delete doc

- clean up styling
    - match all buttons
    - delete mock up borders
    - render empty notes div
    - style modal
- report a bug


## done
- sign up with google authentication
    - after google login get userdata
- create user schema and create new user document in db on signup
- add get firestore requests
    - get current user and all data
- navigate component to direct to home or login based on props
- notes:
    - create
    - update
    - delete

- notebooks: 
    - create
    - update (add notes, change title)
    
- clear fields on submit