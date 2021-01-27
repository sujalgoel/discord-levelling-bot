@echo off

echo Installing/updating bot dependencies
call npm i --save

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)