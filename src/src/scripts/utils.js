let currentID = 0;

export const getCurrentID = ()=>{
  return currentID;
}

export const updateStartingID = (id)=>{
  if(id >= 0) currentID = id;
}

export const nextID = () => {
  return currentID++;
}

export const scrollToTag = (tag) =>{
  const foundTag = document.getElementById(tag);
  if(foundTag) foundTag.scrollIntoView({behavior: "smooth"});
}