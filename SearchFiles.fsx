open System.IO

let searchPath = @"C:\Users\t-ste\OneDrive - Madison College"
let searchTerm = "quiz"

printfn "Searching for files containing '%s' in their name at the root of: %s" searchTerm searchPath
printfn "----------------------------------------------------------"

try
    let files = 
        Directory.EnumerateFiles(searchPath, "*" + searchTerm + "*.*", SearchOption.TopDirectoryOnly)
        |> Seq.map (fun filePath -> new FileInfo(filePath))
        |> Seq.sortByDescending (fun fileInfo -> fileInfo.LastWriteTime)
        |> Seq.toList

    if List.isEmpty files then
        printfn "No files found matching the criteria."
    else
        printfn "Found files (sorted by date modified):"
        files |> List.iter (fun fileInfo -> 
            printfn "- %s (Last Modified: %s)" fileInfo.Name (fileInfo.LastWriteTime.ToString("g")))

with
| :? DirectoryNotFoundException -> 
    printfn "Error: The directory was not found. Please check the path: %s" searchPath
| ex -> 
    printfn "An unexpected error occurred: %s" ex.Message

printfn "----------------------------------------------------------"
printfn "Search complete."
