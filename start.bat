@echo off

echo Starting the bot
call npm run start

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)