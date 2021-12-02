<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    /* headerInfo Object Structure
        {
            headerType: 'text/image/both',
            headerText: 'Example Text',
            headerImgSrc: './assets/example.png',
            headerImgAlt: 'header alt'
            navigationLinks: [
                {linkId: 0, linkText: 'Example Link', linkHref: '#test'}
            ]
        }
     */

    export let headerInfo = {

        //headerType: text/image/both
        headerType: 'both',
        headerText: 'Header Text',
        headerImgSrc: './favicon.png',
        headerImgAlt: 'header alt',
        navigationLinks: [
            {linkId: 0, linkText: 'Link One', linkHref: '#one'},
            {linkId: 1, linkText: 'Link Two', linkHref: '#two'},
            {linkId: 2, linkText: 'Link Three', linkHref: '#three'}
        ]
    };

    export let showHeaderNavigation = true;
    export let mobileModalOpen = false;

    const modalFadeDuration = 400;

    const linkClicked = (id, href)=>{
        dispatch("headerLinkClicked", {id, href});
        mobileModalOpen = false;
    }
</script>
<header class="flex">
    {#if mobileModalOpen == true && showHeaderNavigation == true}
        <div id="mobile-modal-menu" on:click|preventDefault={()=>{mobileModalOpen = false;}} transition:fade={{duration: modalFadeDuration}}>
            {#each headerInfo.navigationLinks as link}
                <li><a class="header-link mobile-link" on:click|preventDefault|stopPropagation={()=>{linkClicked(link.linkId, link.linkHref)}} href={link.linkHref}>{link.linkText}</a></li>
            {/each}
        </div>
    {/if}

    <div id="header-texts" class="flex">
        {#if headerInfo.headerType == 'image'|| headerInfo.headerType == 'both'}
            <img class="header-image" src={headerInfo.headerImgSrc} alt={headerInfo.headerImgAlt}>
        {/if}
        {#if headerInfo.headerType == 'text'|| headerInfo.headerType == 'both'}
            <h1 class="header-text">{headerInfo.headerText}</h1>
        {/if}
    </div>
    {#if showHeaderNavigation == true}
    <nav>
        <ul class="styleless-horizontal-list">
            {#each headerInfo.navigationLinks as link}
                <li><a class="header-link" on:click|preventDefault|stopPropagation={()=>{linkClicked(link.linkId, link.linkHref)}} href={link.linkHref}>{link.linkText}</a></li>
            {/each}
        </ul>
    </nav>
    <svg on:click|preventDefault={()=>{mobileModalOpen=true;}} class="hamburger-icon" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
    {/if}
</header>

<style>

    header{
        --header-bg-color: rgba(0,0,0, 100%);
        --header-primary-text-color: rgba(255,255,255, 100%);
        --header-highlight-text-color: rgb(0, 185, 231);

        --header-padding: 2rem;

        --header-text-size: 3rem;
        --header-image-size: 4rem;
        --header-texts-gap: 1.2rem;

        --header-link-font-size: 1.2rem;
        --header-link-spacing: 1rem;
        --header-link-ease-time: 300ms;

        --header-modal-bg-color: rgba(0,0,0, 90%);

        --hamburger-menu-fill-color: rgb(255, 255, 255);
        --hamburger-menu-fill-highlight-color: rgb(0, 185, 231); 

        width: 100%;
        padding: var(--header-padding);
        align-items: center;
        background: var(--header-bg-color);
        color: var(--header-primary-text-color);
    }

    nav{
        display: none;
        margin: 0 auto;
    }


    #header-texts{
        align-items: center;
        gap: var(--header-texts-gap);
    }

    .header-text{
        font-size: var(--header-text-size);
    }

    .header-image{
        width: var(--header-image-size);
    }

    .header-link{
        font-size: var(--header-link-font-size);
        text-decoration: none;
        margin: 0 var(--header-link-spacing);
        color: var(--header-primary-text-color);
        transition: color var(--header-link-ease-time) ease;
    }

    .header-link:hover{
        color: var(--header-highlight-text-color);
    }

    .hamburger-icon{
        margin: 0 0 0 auto;
        width: auto;
        height: 2.6rem;
        fill: var(--hamburger-menu-fill-color);
        transition: fill 300ms ease;
    }

    .hamburger-icon:hover{ 
        fill: var(--hamburger-menu-fill-highlight-color);
    }

    #mobile-modal-menu{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.4rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--header-modal-bg-color);
    }

    #mobile-modal-menu li{
        list-style: none;
    }

    .mobile-link{
        font-size: 1.8rem;
    }
    @media screen and (min-width: 60rem){
        nav{
            display: block;
        }

        .hamburger-icon{
            display: none;
        }
    }
</style>