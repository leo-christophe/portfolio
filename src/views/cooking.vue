<script setup>
var links = ["https://www.marmiton.org/recettes/recette_quiche-lorraine_30283.aspx",
            "/documents/POULET_ROTI_RECETTE.pdf",
            "https://www.marmiton.org/recettes/recette_tiramisu-recette-originale_12023.aspx"
]
var names = ["Quiche lorraine", "Poulet rôti aux patates douces", "Tiramisù"]
</script>

<template>
    <div id="recettes">
        <h1>Recettes de références</h1>
        <ul>
            <li v-for="(link, index) in links" :key="index">
                <a :href="link" target="_blank"><h3>{{ names[index] }}</h3></a>
            </li>
        </ul>
        
        <br>
        
        <div>
            Au délà de ces références, j'aime bien rencontrer des défis culinaires et les résoudre
            (manque d'ingrédient...). On peut facilement faire un parallèle entre la programmation et
            la cuisine puisque lorsqu'on manque d'ingrédients, on doit en racheter (ou innover!).
            <br>
            Ainsi, j'aime bien trouver des produits de substitutions pour des plats, pour qu'ils soient plus
            sain ou simplement meilleur.
        </div>

    </div>
</template>

<style scoped>
div#recettes{
    margin:5%;
}

ul{
    margin-left:30px;
}
</style>