import fetch from "node-fetch";

export async function handler(event, context) {
  const { bundesland, dauer, schwierigkeit } = JSON.parse(event.body);

  const prompt = `Schlage mir eine Wanderung in ${bundesland}, Österreich vor. 
  Dauer: ${dauer} Stunden, Schwierigkeit: ${schwierigkeit}. 
  Gib Name, kurze Beschreibung und Highlights.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages:[{role:'user', content: prompt}],
      max_tokens: 250
    })
  });

  const data = await response.json();
  const hike = data.choices[0].message.content;

  return { statusCode:200, body: JSON.stringify({ hike }) };
}
