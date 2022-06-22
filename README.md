### Backend ###

Le backend end se trouve dans le répertoire backend à la racine du repository. Pour le stockage des données j'ai choisit mongodb. 

Les services backend et mongodb sont lancés dans des containers docker. Seul le container du service backend (API) est accessible de l'extérieur. Le port d'accés est paramétrable dans le fichier .env qui se trouve à la racine du repository. 

Pour lancer le backend lancer la commande suivante à la racine du projet : 

```
docker-compose --env-file .env up -d
```

Pour recréer la db mongodb lancer la commande suivante à la racine du projet :

```
docker-compose down -v 
```

## Endpoints ##
Generation de short url
```
Method: post
Endpoint : /url
```

Redirection short url
```
Method: get
Endoint : /:shorturl
```
### Frontend ###

Une page html simpliste permet de tester le service, le fichier se trouve dans le répertoire frontend. Le fichier index.html permet de saisir une url et de récupérer un lien court. En cas d'erreur, un message s'affiche. Si le service à reusit à fournir un lien court, il s'affiche sous forme de lien clicable.
