<script>
	import Header from './components/core/Header.svelte';
	import ContentHolder from './components/core/ContentHolder.svelte';
	import Footer from './components/core/Footer.svelte';

    import { SinglePageRouter } from "./scripts/singlepage_router";

	let currentRoute = {routeID: 0, routeName: "todo_view"};

    const appRoutes = [
        {routeID: 0, routeName: "todo_view"}
    ];

    const appRouter = new SinglePageRouter(appRoutes);

	//Info used to fill out the header component
	const headerInfo = {
		headerType: 'text',
        headerText: 'TODOs LIST',
        headerImgSrc: './assets/todos_log.png',
        headerImgAlt: 'header logo',
        navigationLinks: [
            {linkId: 0, linkText: 'Link One', linkHref: '#one'}
        ]
	}

	//Info used to fill out the footer component
	const footerInfo = {
		copyrightName: 'Gugino',
        copyrightYear: '2021',
        socialLinks: {
			facebook: "https://facebook.com/guginogames",
			twitter: "https://twitter.com/JoshuaGugino"
		}
	}

	//Function that is called when a header link gets clicked, sends the link id and link href with event.
	const headerLinkClicked = (event)=>{
		currentRoute = appRouter.changeCurrentRouteByID(event.detail.id);
	}

</script>

<Header headerInfo={headerInfo} on:headerLinkClicked={headerLinkClicked} showHeaderNavigation={false}></Header>

<main class="doc-font-300">
	<ContentHolder bind:currentRoute={currentRoute}></ContentHolder>
</main>

<Footer footerInfo={footerInfo}></Footer>

<style>
	
</style>