#!/bin/bash

## 변수 설정
txtrst='\033[1;37m' # White
txtred='\033[1;31m' # Red
txtylw='\033[1;33m' # Yellow
txtpur='\033[1;35m' # Purple
txtgrn='\033[1;32m' # Green
txtgra='\033[1;30m' # Gray

PID=""
SHELL_SCRIPT_PATH=$(dirname $0)
BRANCH=$1
PROFILE=$2

if [[ $# -ne 2 ]]; then
  echo -e "${txtylw}=======================================${txtrst}"
  echo -e "${txtgrn}  << 잘못된 입력값 🧐 >>${txtrst}"
  echo -e "${txtylw}=======================================${txtrst}"
  exit
fi

echo -e "${txtylw}=======================================${txtrst}"
echo -e "${txtgrn}  << 배포 🧐 >>${txtrst}"
echo -e ""
echo -e "${txtgrn} $SHELL_SCRIPT_PATH $BRANCH ${txtred}$PROFILE"
echo -e "${txtylw}=======================================${txtrst}"

cd $SHELL_SCRIPT_PATH

function pull() {
  echo -e ""
  echo -e ">> Pull Request 🏃♂️ "
  git pull origin ${BRANCH}
}

function build() {
  echo -e ""
  echo -e ">> Build 🏃♂️ "
  ./gradlew clean build -x test
}

function find_pid() {
  if [[ -e subway.pid ]]; then
    echo -e ""
    echo -e ">> Find pid 🏃♂️ "

    PID=$(cat subway.pid)
    echo -e $PID
  fi
}

function shutdown() {
  if [[ -n $PID ]]; then
    echo -e ""
    echo -e ">> Application is shutting down 🏃♂️ "
    kill $PID

    while [[ -e /proc/$PID ]]
    do
      echo -e "."
      sleep 1
    done
  fi
}

function launch() {
  echo -e ""
  echo -e ">> Application is launching 🏃♂️ "

  nohup java -jar -Dspring.profiles.active=$PROFILE build/libs/subway-0.0.1-SNAPSHOT.jar &
}

function check_df() {
  git fetch
  main=$(git rev-parse $BRANCH)
  remote=$(git rev-parse origin/$BRANCH)

  if [[ $main == $remote ]]; then
    echo -e "[$(date)] Nothing to do!!! 😫"
    exit 1
  fi
}

function deploy() {
  check_df;
  pull;
  build;
  find_pid;
  shutdown;
  launch;
}

deploy;
