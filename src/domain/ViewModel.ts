export interface ViewModelState {
  isLoading: boolean;
}

export interface ViewModelCallbacks {
  loadView: () => Promise<void>;
}

export type ViewModel = ViewModelState & ViewModelCallbacks;

export type ViewModelHook<P> = (props: P) => ViewModel;
