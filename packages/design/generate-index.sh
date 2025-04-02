#!/bin/bash

# Navigate to the components directory
cd ./src/components

# Create or overwrite the index.tsx file
echo "// This file is auto-generated. Do not edit manually." > index.tsx
echo "" >> index.tsx

# Function to process each directory
process_directory() {
    local dir=$1
    echo "// $dir exports" >> index.tsx
    
    # Find all index.tsx files in subdirectories
    find "$dir" -type f -name "index.tsx" | while read -r file; do
        # Get the relative path of the directory containing index.tsx
        relative_path=${file#$dir/}
        # Remove the /index.tsx from the end
        relative_path=${relative_path%/index.tsx}
        # Get the name of the deepest directory (component name)
        component_name=$(basename "$(dirname "$file")")
        
        # Check if the file is empty (only whitespace or empty)
        if [ -s "$file" ] && [ -n "$(tr -d '[:space:]' < "$file")" ]; then
            # File is not empty, check for exports
            
            # Check for default export
            if grep -q "export default" "$file"; then
                echo "export { default as ${component_name} } from './${dir}/${relative_path}';" >> index.tsx
            fi
            
            # Check for named exports
            named_exports=$(grep "export const" "$file" | sed -E 's/export const ([a-zA-Z0-9_]+).*/\1/')
            if [ -n "$named_exports" ]; then
                exports_list=$(echo "$named_exports" | tr '\n' ',' | sed 's/,$//')
                echo "export { $exports_list } from './${dir}/${relative_path}';" >> index.tsx
            fi
            
            # If no exports found, add as a comment
            if [ -z "$named_exports" ] && ! grep -q "export default" "$file"; then
                echo "// TODO: No exports found in ${component_name} ('./${dir}/${relative_path}')" >> index.tsx
            fi
        else
            # File is empty, add a comment for future component
            echo "// TODO: Future component - ${component_name} ('./${dir}/${relative_path}')" >> index.tsx
        fi
    done
    
    echo "" >> index.tsx
}

# Process each main directory
process_directory "Atoms"
process_directory "Molecules"
process_directory "Loaders"
process_directory "custom"

echo "index.tsx has been generated successfully."