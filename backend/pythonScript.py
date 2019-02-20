import time
import csv
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class FileWatcher(FileSystemEventHandler):
    def on_modified(self, event):
        path = event.src_path
        with open(path) as csv_file:  
          csv_reader = csv.reader(csv_file, delimiter=',')
          lines = []
          for row in csv_reader:
             lines.append(", ".join(row))
          print(lines[-1])

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