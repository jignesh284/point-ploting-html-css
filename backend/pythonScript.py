import time
import csv
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class FileWatcher(FileSystemEventHandler):
    #Function trigers on modification.
    def on_modified(self, event):
        # we get the path of the file which is changed. 
        path = event.src_path
       
        with open(path) as csv_file:  
          csv_reader = csv.reader(csv_file, delimiter=',')
          stack = []
          # reads all the points in a stack and then just prints the last one
          for row in csv_reader:
             stack.append(", ".join(row))

          print(stack[-1])

if __name__ == "__main__":
    print("Python Watcher is ON")
    handler_func = FileWatcher()
    observer = Observer()
    observer.schedule(handler_func, path='../csv', recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()