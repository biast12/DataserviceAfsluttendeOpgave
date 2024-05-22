@Echo Off
REM This script sets up a new React project
Title Setting up React project
Echo Setting up React project...

REM Verify Node.js and npm are installed
Where /Q node
IF %ERRORLEVEL% NEQ 0 (
	Echo Node.js is not installed or not found in PATH
	REM Open the Node.js download page in the default browser
	Start https://nodejs.org/en/download/
	rundll32.exe cmdext.dll,MessageBeepStub
	Pause
	Exit /B %ERRORLEVEL%
)
Where /Q npm
IF %ERRORLEVEL% NEQ 0 (
	Echo npm is not installed or not found in PATH
	REM Open the Node.js download page in the default browser
	Start https://nodejs.org/en/download/
	rundll32.exe cmdext.dll,MessageBeepStub
	Pause
	Exit /B %ERRORLEVEL%
)

REM Create necessary folders
IF NOT EXIST assets Mkdir assets
IF NOT EXIST assets\img Mkdir assets\img
IF NOT EXIST assets\json Mkdir assets\json
IF NOT EXIST src\components Mkdir src\components

REM Delete the .git folder
IF EXIST .git @RD /S /Q ".git"
IF EXIST README.md Del README.md
IF EXIST .gitattributes Del .gitattributes

REM Initialize npm and install
Call npm i >NUL
IF %ERRORLEVEL% NEQ 0 (
	Echo npm init failed with error: %ERRORLEVEL%
	rundll32.exe cmdext.dll,MessageBeepStub
	Pause
	Exit /B %ERRORLEVEL%
)
