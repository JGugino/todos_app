export let scrollToTag = (tag) =>{
  const foundTag = document.getElementById(tag);
  if(foundTag) foundTag.scrollIntoView({behavior: "smooth"});
}