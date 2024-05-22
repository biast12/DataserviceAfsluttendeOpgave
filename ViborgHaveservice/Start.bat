Set "ThisPath=%CD%"
CD backend
Start "" "Start_Server.bat"

CD ..\frontend
Start "" "Run-Dev.bat"