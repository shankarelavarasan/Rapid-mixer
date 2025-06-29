// script.js

// File Input Element-க்கான Event Listener
// 'zipInput' என்பதற்கு பதிலாக 'folderInput' என்று மாற்றப்பட்டுள்ளது
document.getElementById('folderInput').addEventListener('change', function (e) {
  const files = e.target.files;
  let allText = '';
  let txtCount = 0;

  // தேர்ந்தெடுக்கப்பட்ட கோப்புகளை Process செய்தல்
  const readerPromises = Array.from(files).map(file => {
    // .txt கோப்புகளை மட்டும் Filter செய்யவும், இது ஒரு கோப்புறை உள்ளே இருக்கும் கோப்புகளுக்கும் பொருந்தும்
    if (!file.type && file.name.endsWith('.txt')) { // !file.type என்பது File-ஐ விட Folder-ஐ அடையாளம் காண உதவும், ஆனால் webkitdirectory-ல் தேர்ந்தெடுக்கப்படும் கோப்புகளுக்கு இது சரியாக வேலை செய்யாது. பொதுவாக வெறும் file.name.endsWith('.txt') போதுமானது.
       // ஒரு கோப்புறையில் உள்ள கோப்புகளை கையாளும்போது, கோப்பு பாதையை (subfolders) கவனமாக கையாள வேண்டும்
       // இங்கு கோப்பு பெயர் மட்டுமே பயன்படுத்தப்படுகிறது, இது பொதுவாக எளிமையான பயன்பாட்டிற்கு சரி.
      txtCount++;
      // கோப்பின் உள்ளடக்கத்தைப் படிக்கவும்
      return file.text().then(content => {
        // எல்லா .txt கோப்புகளின் உள்ளடக்கத்தையும் சேர்த்துக்கொள்ளவும், ஒவ்வொரு கோப்பிற்கும் ஒரு பிரிப்பான் சேர்க்கவும்
        allText += `\n\n--- ${file.name} ---\n${content}`;
      }).catch(error => {
          console.error(`Error reading file ${file.name}:`, error);
          // கோப்பு படிக்கத் தவறினால், அதைப் பற்றி குறிக்கலாம்
          allText += `\n\n--- ${file.name} (Error Reading) ---\n`;
      });
    }
    return Promise.resolve(); // .txt அல்லாத கோப்புகளை புறக்கணிக்கவும்
  });

  // எல்லா கோப்புகளையும் படித்து முடித்த பிறகு
  Promise.all(readerPromises).then(() => {
      // Promise.all rejected ஆகாமல் இருப்பதற்கு catch-ஐ Promise-க்குள் சேர்த்துள்ளோம், இங்கு errors இருந்தாலும் proceed ஆகும்.
      // காட்டப்படும் Text-ஐ Update செய்யவும்
    document.getElementById("responseArea").textContent = `📄 ${txtCount} .txt files loaded.\nReady to run Gemini.\n\nExtracted Text:\n${allText}`;
     // allText-ஐ ஒரு குளோபல் மாறி அல்லது வேறு வழியில் Analyze பட்டன் கிளிக் செய்யும் போது பயன்படுத்த சேமிக்க வேண்டும்.
     // தற்போதைய code-ல் இது responseArea-வில் சேர்க்கப்படுகிறது, இது சரியாக இருக்கலாம் அல்லது இல்லாமல் போகலாம், உங்கள் தேவையைப் பொறுத்தது.
     // ஒரு தனி மாறி பயன்படுத்துவது பொதுவாக சிறந்த வழி. உதாரணமாக: window.loadedFilesText = allText;
  }).catch(error => {
      console.error("Error processing files:", error);
      document.getElementById("responseArea").textContent = "❌ Error loading files.";
  });
});


// Analyze பட்டனுக்கான Event Listener
document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const userPrompt = document.getElementById('promptInput').value;
  // responseArea-வில் இருந்து data எடுப்பது உங்களுக்குத் தேவையா அல்லது முன்னர் சேமித்த allText தேவையா என்பதை உறுதிப்படுத்தவும்
  // தற்போதைய code responseArea-வில் இருந்து எடுக்கிறது
  const loadedContent = document.getElementById("responseArea").textContent; // இது இப்போது file content + count text-ஐ கொண்டிருக்கும்

  // File Load செய்யப்பட்டுள்ளதா என ஒரு எளிய சோதனை
  // இந்த சோதனை சரியாக வேலை செய்யுமா என்பது responseArea text format-ஐப் பொறுத்தது
  // நீங்கள் தனி மாறியில் allText சேமித்திருந்தால், அதைச் சோதிப்பது நல்லது
  if (!loadedContent.includes("Extracted Text:")) { // Text Format-ஐ பொறுத்து இந்த சோதனை மாற்றப்பட வேண்டும்
    alert("📂 Please select a folder with .txt files first!");
    return;
  }

  // Prompt-ஐ கோப்பு உள்ளடக்கத்துடன் சேர்க்கவும்
  // loadedContent-ல் count மற்றும் மற்ற text இருப்பதால், சரியான file content பிரித்தெடுக்க வேண்டும் அல்லது தனியாக சேமித்த allText-ஐ பயன்படுத்த வேண்டும்.
  // தற்போதைய code responseArea முழுவதும் அனுப்புகிறது, இது Gemini-க்கு தேவை இல்லாத தகவலை அனுப்பலாம்.
  // உங்கள் Backend எதிர்பார்ப்பைப் பொறுத்து இதை சரி செய்ய வேண்டும்.
  // உதாரணமாக, நீங்கள் window.loadedFilesText = allText; என்று மேலே சேமித்திருந்தால்:
  // const fullPrompt = userPrompt + '\n\n' + window.loadedFilesText;
  const fullPrompt = userPrompt + '\n\n' + loadedContent; // தற்போதைய Code-ன்படி


  document.getElementById("responseArea").textContent = "⌛ Sending prompt to Gemini..."; // Loading நிலை காட்டுதல்

  try {
    // Backend API-க்கு Request அனுப்புதல்
    // உங்கள் Glitch URL: https://plaid-occipital-noise.glitch.me
    const response = await fetch("https://plaid-occipital-noise.glitch.me/ask-gemini", {
      method: "POST", // POST method
      headers: { "Content-Type": "application/json" }, // JSON format-ல் data அனுப்புதல்
      body: JSON.stringify({ prompt: fullPrompt }) // Prompt data-வை JSON ஆக மாற்றுதல்
    });

    // Response successful ஆக இருந்ததா எனச் சரிபார்த்தல் (Status Code 200-299)
    if (!response.ok) {
        const errorText = await response.text(); // Backend-லிருந்து வந்த Error Text
        throw new Error(`HTTP error! status: ${response.status}\n${errorText}`);
    }

    // Response-ல் இருந்து Result-ஐப் பெறுதல்
    const result = await response.text(); // Backend plain text அனுப்புவதாக அனுமானம்

    // Result-ஐ Webpage-ல் காட்டுதல்
    document.getElementById("responseArea").textContent = result;

  } catch (error) {
    // API அழைப்பில் பிழை ஏற்பட்டால்
    console.error("Gemini API call failed:", error);
    document.getElementById("responseArea").textContent = "❌ Gemini API call failed.\n" + error.message; // Error message-ஐ காட்டவும்
  }
});
