<script>
  import RoundForm from "./RoundForm.svelte";
  import {BankStore} from "../stores";
$: round = 0;

let names;

const updateNames = () => {
  // console.log($BankStore);
  round++;

}

const handleRound = () => {
  let roundDeposits = [];
  let communityFund = 0;
  // @ts-ignore
  document.querySelectorAll(".player-input").forEach(ele => ((ele.value <= 5) && (ele.value >= 0)) ? roundDeposits.push(5 - ele.value) : roundDeposits.push(0));
  console.log(roundDeposits);

  // let communityFund = Math.ceil(Number(roundDeposits.reduce((sum, depo) => {
  //   Number(sum) + Number(depo)
  // }, 0)) / 5);  
  for (let i = 0; i < 5; i++) {
    communityFund = Number(communityFund) + Number(5 - roundDeposits[i]);
  }


  communityFund = Math.ceil(2 * communityFund / 5);

  console.log(communityFund);

  for (let i = 0; i < 5; i++) {
    $BankStore[i].deposits[round - 1] = roundDeposits[i];
    $BankStore[i].accountTotal = Number($BankStore[i].accountTotal) + Number($BankStore[i].deposits[round - 1]) + communityFund;
  }

  $BankStore = $BankStore;
  round++;

}

const validWinner = () => {
  let winner = -1;
  let winnerTotal = 39;
  for (let i = 0; i < 5; i++) {
    if ($BankStore[i].accountTotal > winnerTotal) {
      winner = i;
      winnerTotal = $BankStore[i].accountTotal;
    }
  }

  return winner;
}

</script>

<main>
  {#if round == 0}
    <h1>Please enter the names of each player</h1>

    <form class="name-form" on:submit|preventDefault={updateNames}>
      {#each $BankStore as account (account.id)}
        <h3>{account.name}</h3>
        <input class="name-input" type="text" bind:value={account.name}>
      {/each}
  
      <button type="submit">Submit</button>
    </form>

  {:else if round <= 5}
    <h1>Round {round}: Please enter a donation amount between 0 and 5</h1>

    <form class="player-form" on:submit|preventDefault={handleRound}>
      {#each $BankStore as account (account.id)}
        <h3>{account.name}</h3>
        <input class="player-input" type="password" placeholder="0-5">
      {/each}
  
      <button type="submit">Submit</button>
    </form>

  {:else}
    <h1>Final Results</h1>
    {#if validWinner() != -1}
      <h2>The winner is {$BankStore[validWinner()].name}.</h2>
    {:else}
      <h2>Everyone lost.</h2>  
    {/if}
    {#each $BankStore as account (account.id)}
      <h3>{account.name} had ${account.accountTotal} in their bank account</h3>
    {/each}
  {/if}

</main>

<style>

</style>
