# How to Add a Level

Hello! Thank you for being interested in helping out the developer community by adding a level to Flownaut!

Here are the steps to add a level:

1. Create a folder with the name being the title of your level.
2. In the folder you create, add a language folder. For example, for English, you would add a `en` folder. For the languages we support, go to the `/src/i18n` folder and view all the language folders there.
3. In the language folder, you should have the following files:
- `overview.ts` - follow the format like the others.
- `readme.md` - what will display on the level page. You must include the contract code at the bottom like the others do.
- `success.cdc` - this script will be run to check if the user passes the level. **It must return a `Bool` type - `true` if the user passes, `false` if not.**
- `contract.cdc` - the contract to be deployed when the user clicks "Start Level". **It must match the contract code displayed at the bottom of `readme.md`.**
- (*OPTIONAL*) `deploy.cdc` - a custom deploy script to be used when the user clicks "Start Level". Can be used to set up user storage like initializing Vaults or NFT Collections and stuff like that.