#/bin/sh
GREEN='\033[0;32m'
RED='\033[0;31m'
RESET='\033[0m'

if ! yarn -v COMMAND &> /dev/null
then
    echo "${RED}O YARN nao foi encontrado${RESET}\n"
    read -p "Deseja instalar o YARN? [yn]" yn
    case $yn in
        [Yy]* ) npm i -g yarn; break;;
        * ) exit;;
    esac
else 
    echo "${GREEN}O YARN esta instalado${RESET}\n"
fi