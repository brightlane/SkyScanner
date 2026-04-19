import subprocess
from concurrent.futures import ThreadPoolExecutor

# List of all article generators (paths or names of the scripts)
generators = [
    "article_generator1.py",  # Replace with your actual script names
    "article_generator2.py",  # Same here
    "article_generator3.py"   # Add more generators as needed
]

# Function to run a generator script
def run_generator(script):
    try:
        print(f"Running generator script: {script}")
        result = subprocess.run(
            ["python", script],  # Adjust if using python3 or other command
            check=True,
            capture_output=True,
            text=True
        )
        print(f"Output from {script}:\n{result.stdout}")
    except subprocess.CalledProcessError as e:
        print(f"Error running {script}:\n{e.stderr}")
    except FileNotFoundError:
        print(f"Script {script} not found.")

# Sequential execution of generators (run one after the other)
def run_generators_sequential():
    for generator in generators:
        run_generator(generator)

# Parallel execution of generators (run all at once)
def run_generators_parallel():
    with ThreadPoolExecutor() as executor:
        executor.map(run_generator, generators)

# Main function to execute the process
def main():
    # Choose whether you want sequential or parallel execution
    print("Running generators in parallel:")
    run_generators_parallel()

    # Or to run sequentially, uncomment the line below
    # run_generators_sequential()

if __name__ == "__main__":
    main()
