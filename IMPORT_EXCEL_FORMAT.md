# Format d'Import Excel pour les Produits

## Structure du Fichier Excel Attendu

Le fichier Excel doit contenir les colonnes suivantes (les noms peuvent varier) :

### Colonnes Obligatoires
| Nom de Colonne (Options) | Type | Description | Exemple |
|-------------------------|------|-------------|---------|
| `Nom du produit` / `Nom` / `Product Name` | Texte | Nom du produit | "Vis M8x20" |
| `Description` / `Desc` | Texte | Description détaillée | "Vis métallique M8x20mm inox" |
| `Quantité disponible` / `Stock` / `Quantité` | Nombre | Quantité en stock | 150 |
| `Prix unitaire (TND)` / `Prix` / `Price` | Nombre | Prix unitaire en dinars | 0.25 |
| `Stock minimum` / `Min` / `Min Stock` | Nombre | Seuil minimum | 10 |
| `Stock maximum` / `Max` / `Max Stock` | Nombre | Seuil maximum | 500 |
| `Statut` | Texte | Statut du stock | "Stock optimal" |

### Valeurs par Défaut
Si certaines colonnes sont manquantes, les valeurs par défaut suivantes seront utilisées :
- **Description** : Chaîne vide
- **Stock** : 0
- **Prix** : 0.00 TND
- **Stock minimum** : 5
- **Stock maximum** : 100
- **Statut** : "Stock optimal"

### Statuts Possibles
- `Stock optimal` (par défaut)
- `Stock critique`
- `En commande`

## Exemple de Fichier Excel

| Nom du produit | Description | Quantité disponible | Prix unitaire (TND) | Stock minimum | Stock maximum | Statut |
|---------------|-------------|-------------------|-------------------|---------------|---------------|--------|
| Vis M8x20 | Vis métallique M8x20mm inox | 150 | 0.25 | 10 | 500 | Stock optimal |
| Écrou M8 | Écrou métallique M8 inox | 75 | 0.15 | 10 | 300 | Stock optimal |
| Rondelle M8 | Rondelle plate M8 inox | 200 | 0.05 | 20 | 1000 | Stock optimal |
| Joint torique | Joint torique NBR 50x3 | 25 | 2.50 | 5 | 100 | Stock critique |

## Instructions d'Utilisation

1. **Préparation** : Créez votre fichier Excel avec les colonnes mentionnées ci-dessus
2. **Format** : Sauvegardez le fichier au format `.xlsx` ou `.xls`
3. **Import** : 
   - Allez dans l'onglet "Produits" (accessible uniquement au département Technique)
   - Cliquez sur le bouton "Importer Excel"
   - Sélectionnez votre fichier
   - Les produits seront automatiquement ajoutés au système

## Notes Importantes

- ⚠️ **Département Technique uniquement** : Cette fonctionnalité n'est disponible que pour le département Technique
- ✅ **Validation automatique** : Le système ignore les lignes avec des noms de produits vides
- 🔄 **Gestion des erreurs** : En cas d'erreur sur une ligne, celle-ci est ignorée et les autres continuent d'être traitées
- 📊 **Feedback** : Un message de confirmation indique le nombre de produits traités avec succès
